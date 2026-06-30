// Amortization schedule calculations and table generation
import { formatter } from './format.js';

export class AmortizationCalculator {
    constructor() {
        this.schedule = [];
        this.summary = {};
    }

    // Calculate monthly payment using standard formula
    calculateMonthlyPayment(principal, annualRate, totalMonths) {
        if (annualRate === 0) {
            return principal / totalMonths;
        }
        
        const monthlyRate = annualRate / 100 / 12;
        const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                       (Math.pow(1 + monthlyRate, totalMonths) - 1);
        
        return payment;
    }

    // Calculate bi-weekly payment
    calculateBiWeeklyPayment(principal, annualRate, totalYears) {
        const totalPayments = totalYears * 26; // 26 bi-weekly payments per year
        
        if (annualRate === 0) {
            return principal / totalPayments;
        }
        
        const biWeeklyRate = annualRate / 100 / 26;
        const payment = principal * (biWeeklyRate * Math.pow(1 + biWeeklyRate, totalPayments)) / 
                       (Math.pow(1 + biWeeklyRate, totalPayments) - 1);
        
        return payment;
    }

    // Generate full amortization schedule
    generateSchedule(principal, annualRate, loanTermYears, paymentFrequency = 'monthly', extraPayment = 0, startDate = new Date()) {
        this.schedule = [];
        
        const isMonthly = paymentFrequency === 'monthly';
        const paymentsPerYear = isMonthly ? 12 : 26;
        const totalPayments = loanTermYears * paymentsPerYear;
        const periodRate = annualRate / 100 / paymentsPerYear;
        
        // Calculate base payment
        let basePayment;
        if (isMonthly) {
            basePayment = this.calculateMonthlyPayment(principal, annualRate, totalPayments);
        } else {
            basePayment = this.calculateBiWeeklyPayment(principal, annualRate, loanTermYears);
        }

        let remainingBalance = principal;
        let totalInterestPaid = 0;
        let totalPrincipalPaid = 0;
        let paymentNumber = 1;
        let currentDate = new Date(startDate);

        while (remainingBalance > 0.01 && paymentNumber <= totalPayments * 1.5) {
            // Calculate interest for this period
            const interestPayment = remainingBalance * periodRate;
            
            // Calculate principal payment (base + extra)
            let principalPayment = basePayment - interestPayment + extraPayment;
            
            // Don't pay more principal than remaining balance
            if (principalPayment > remainingBalance) {
                principalPayment = remainingBalance;
            }
            
            const totalPayment = interestPayment + principalPayment;
            
            // Update running totals
            totalInterestPaid += interestPayment;
            totalPrincipalPaid += principalPayment;
            remainingBalance -= principalPayment;

            // Add to schedule
            this.schedule.push({
                paymentNumber,
                date: new Date(currentDate),
                payment: totalPayment,
                principal: principalPayment,
                interest: interestPayment,
                extraPayment: Math.min(extraPayment, principalPayment),
                balance: Math.max(0, remainingBalance)
            });

            // Break if loan is paid off
            if (remainingBalance <= 0.01) break;

            // Increment date and payment number
            if (isMonthly) {
                currentDate.setMonth(currentDate.getMonth() + 1);
            } else {
                currentDate.setDate(currentDate.getDate() + 14);
            }
            paymentNumber++;
        }

        // Calculate summary
        this.summary = {
            totalPayments: this.schedule.length,
            totalInterest: totalInterestPaid,
            totalPrincipal: totalPrincipalPaid,
            totalAmount: totalInterestPaid + totalPrincipalPaid,
            basePayment: basePayment,
            finalPaymentDate: this.schedule[this.schedule.length - 1]?.date,
            interestSaved: 0, // Will be calculated in comparison
            timeSaved: 0 // Will be calculated in comparison
        };

        return this.schedule;
    }

    // Generate annual summary from schedule
    generateAnnualSummary() {
        const annualData = {};
        
        this.schedule.forEach(payment => {
            const year = payment.date.getFullYear();
            
            if (!annualData[year]) {
                annualData[year] = {
                    year,
                    totalPayments: 0,
                    totalPrincipal: 0,
                    totalInterest: 0,
                    totalExtra: 0,
                    endingBalance: 0,
                    paymentCount: 0
                };
            }
            
            annualData[year].totalPayments += payment.payment;
            annualData[year].totalPrincipal += payment.principal;
            annualData[year].totalInterest += payment.interest;
            annualData[year].totalExtra += payment.extraPayment || 0;
            annualData[year].endingBalance = payment.balance;
            annualData[year].paymentCount++;
        });

        return Object.values(annualData);
    }

    // Calculate payoff acceleration comparison
    compareWithoutExtra(principal, annualRate, loanTermYears, paymentFrequency = 'monthly') {
        const originalCalculator = new AmortizationCalculator();
        originalCalculator.generateSchedule(principal, annualRate, loanTermYears, paymentFrequency, 0);
        
        const originalSummary = originalCalculator.summary;
        
        // Calculate savings
        this.summary.interestSaved = originalSummary.totalInterest - this.summary.totalInterest;
        this.summary.timeSaved = originalSummary.totalPayments - this.summary.totalPayments;
        
        return {
            original: originalSummary,
            withExtra: this.summary,
            savings: {
                interest: this.summary.interestSaved,
                payments: this.summary.timeSaved,
                timeInMonths: paymentFrequency === 'monthly' ? this.summary.timeSaved : Math.round(this.summary.timeSaved / 2)
            }
        };
    }

    // Calculate loan balance at specific date
    getBalanceAtDate(targetDate) {
        for (let i = 0; i < this.schedule.length; i++) {
            if (this.schedule[i].date >= targetDate) {
                return i > 0 ? this.schedule[i - 1].balance : this.schedule[0].balance;
            }
        }
        return 0; // Loan is paid off
    }

    // Calculate remaining payments from specific date
    getRemainingPayments(targetDate) {
        const balanceAtDate = this.getBalanceAtDate(targetDate);
        return this.schedule.filter(payment => payment.date >= targetDate).length;
    }

    // Generate HTML table for amortization schedule
    generateScheduleTable(containerId, showYearsOnly = false, maxRows = 120) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const displaySchedule = showYearsOnly ? 
            this.schedule.filter((payment, index) => index === 0 || payment.date.getMonth() === 0 || index === this.schedule.length - 1) :
            this.schedule.slice(0, maxRows);

        const table = document.createElement('table');
        table.className = 'amortization-table';
        table.setAttribute('role', 'table');
        table.setAttribute('aria-label', 'Amortization Schedule');

        // Create header
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th scope="col">Payment #</th>
                <th scope="col">Date</th>
                <th scope="col">Payment</th>
                <th scope="col">Principal</th>
                <th scope="col">Interest</th>
                <th scope="col">Balance</th>
            </tr>
        `;
        table.appendChild(thead);

        // Create body
        const tbody = document.createElement('tbody');
        displaySchedule.forEach(payment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${payment.paymentNumber}</td>
                <td>${formatter.formatDate(payment.date)}</td>
                <td>${formatter.formatCurrency(payment.payment)}</td>
                <td>${formatter.formatCurrency(payment.principal)}</td>
                <td>${formatter.formatCurrency(payment.interest)}</td>
                <td>${formatter.formatCurrency(payment.balance)}</td>
            `;
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        // Clear container and add table
        container.innerHTML = '';
        container.appendChild(table);

        // Add pagination controls if needed
        if (this.schedule.length > maxRows && !showYearsOnly) {
            this.addPaginationControls(container, maxRows);
        }

        // Add view toggle
        this.addViewToggle(container, containerId, maxRows);
    }

    // Add pagination controls
    addPaginationControls(container, rowsPerPage) {
        const totalPages = Math.ceil(this.schedule.length / rowsPerPage);
        if (totalPages <= 1) return;

        const paginationDiv = document.createElement('div');
        paginationDiv.className = 'pagination-controls';

        for (let i = 1; i <= Math.min(totalPages, 10); i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.className = 'pagination-btn';
            if (i === 1) button.classList.add('active');
            
            button.addEventListener('click', () => {
                this.showPage(container.querySelector('.amortization-table'), i, rowsPerPage);
                container.querySelectorAll('.pagination-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
            
            paginationDiv.appendChild(button);
        }

        container.appendChild(paginationDiv);
    }

    // Add view toggle (monthly/yearly)
    addViewToggle(container, containerId, maxRows) {
        const toggleDiv = document.createElement('div');
        toggleDiv.className = 'view-toggle';

        const monthlyBtn = document.createElement('button');
        monthlyBtn.textContent = 'Monthly View';
        monthlyBtn.className = 'toggle-btn active';
        
        const yearlyBtn = document.createElement('button');
        yearlyBtn.textContent = 'Yearly View';
        yearlyBtn.className = 'toggle-btn';

        monthlyBtn.addEventListener('click', () => {
            this.generateScheduleTable(containerId, false, maxRows);
        });

        yearlyBtn.addEventListener('click', () => {
            this.generateScheduleTable(containerId, true, maxRows);
        });

        toggleDiv.appendChild(monthlyBtn);
        toggleDiv.appendChild(yearlyBtn);
        container.insertBefore(toggleDiv, container.firstChild);
    }

    // Show specific page of schedule
    showPage(table, page, rowsPerPage) {
        const tbody = table.querySelector('tbody');
        const startIndex = (page - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const pageSchedule = this.schedule.slice(startIndex, endIndex);

        tbody.innerHTML = '';
        pageSchedule.forEach(payment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${payment.paymentNumber}</td>
                <td>${formatter.formatDate(payment.date)}</td>
                <td>${formatter.formatCurrency(payment.payment)}</td>
                <td>${formatter.formatCurrency(payment.principal)}</td>
                <td>${formatter.formatCurrency(payment.interest)}</td>
                <td>${formatter.formatCurrency(payment.balance)}</td>
            `;
            tbody.appendChild(row);
        });
    }

    // Export schedule to CSV
    exportToCSV(filename = 'amortization_schedule.csv') {
        const headers = ['Payment #', 'Date', 'Payment', 'Principal', 'Interest', 'Balance'];
        const csvContent = [
            headers.join(','),
            ...this.schedule.map(payment => [
                payment.paymentNumber,
                payment.date.toLocaleDateString(),
                payment.payment.toFixed(2),
                payment.principal.toFixed(2),
                payment.interest.toFixed(2),
                payment.balance.toFixed(2)
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(url);
    }
}