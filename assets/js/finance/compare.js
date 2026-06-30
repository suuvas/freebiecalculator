// Comparison utilities for A vs B scenarios
import { AmortizationCalculator } from './amortization.js';
import { formatter } from './format.js';
import { charts } from './charts.js';

export class FinanceComparator {
    constructor() {
        this.scenarios = {
            A: {},
            B: {}
        };
        this.comparisonResults = null;
    }

    // Set scenario data
    setScenario(scenario, data) {
        if (scenario !== 'A' && scenario !== 'B') {
            throw new Error('Scenario must be A or B');
        }
        this.scenarios[scenario] = { ...data };
    }

    // Compare mortgage scenarios
    compareMortgages(scenarioA, scenarioB) {
        const calcA = new AmortizationCalculator();
        const calcB = new AmortizationCalculator();

        // Generate schedules for both scenarios
        const scheduleA = calcA.generateSchedule(
            scenarioA.principal,
            scenarioA.interestRate,
            scenarioA.loanTerm,
            scenarioA.paymentFrequency || 'monthly',
            scenarioA.extraPayment || 0
        );

        const scheduleB = calcB.generateSchedule(
            scenarioB.principal,
            scenarioB.interestRate,
            scenarioB.loanTerm,
            scenarioB.paymentFrequency || 'monthly',
            scenarioB.extraPayment || 0
        );

        // Calculate comparison metrics
        const comparison = {
            scenarioA: {
                label: scenarioA.label || 'Option A',
                monthlyPayment: calcA.summary.basePayment,
                totalInterest: calcA.summary.totalInterest,
                totalAmount: calcA.summary.totalAmount,
                totalPayments: calcA.summary.totalPayments,
                payoffDate: calcA.summary.finalPaymentDate,
                schedule: scheduleA
            },
            scenarioB: {
                label: scenarioB.label || 'Option B',
                monthlyPayment: calcB.summary.basePayment,
                totalInterest: calcB.summary.totalInterest,
                totalAmount: calcB.summary.totalAmount,
                totalPayments: calcB.summary.totalPayments,
                payoffDate: calcB.summary.finalPaymentDate,
                schedule: scheduleB
            },
            differences: {
                monthlyPayment: calcB.summary.basePayment - calcA.summary.basePayment,
                totalInterest: calcB.summary.totalInterest - calcA.summary.totalInterest,
                totalAmount: calcB.summary.totalAmount - calcA.summary.totalAmount,
                totalPayments: calcB.summary.totalPayments - calcA.summary.totalPayments,
                payoffTimeDifference: this.calculateTimeDifference(calcA.summary.finalPaymentDate, calcB.summary.finalPaymentDate)
            }
        };

        this.comparisonResults = comparison;
        return comparison;
    }

    // Compare investment scenarios
    compareInvestments(scenarioA, scenarioB) {
        const resultsA = this.calculateInvestmentGrowth(scenarioA);
        const resultsB = this.calculateInvestmentGrowth(scenarioB);

        const comparison = {
            scenarioA: {
                label: scenarioA.label || 'Option A',
                finalValue: resultsA.finalValue,
                totalContributions: resultsA.totalContributions,
                totalInterest: resultsA.totalInterest,
                roi: resultsA.roi,
                projections: resultsA.projections
            },
            scenarioB: {
                label: scenarioB.label || 'Option B',
                finalValue: resultsB.finalValue,
                totalContributions: resultsB.totalContributions,
                totalInterest: resultsB.totalInterest,
                roi: resultsB.roi,
                projections: resultsB.projections
            },
            differences: {
                finalValue: resultsB.finalValue - resultsA.finalValue,
                totalContributions: resultsB.totalContributions - resultsA.totalContributions,
                totalInterest: resultsB.totalInterest - resultsA.totalInterest,
                roi: resultsB.roi - resultsA.roi
            }
        };

        this.comparisonResults = comparison;
        return comparison;
    }

    // Calculate investment growth over time
    calculateInvestmentGrowth(params) {
        const { principal, interestRate, timeYears, monthlyContribution = 0, compoundFrequency = 'monthly' } = params;
        
        const compoundsPerYear = {
            'annually': 1,
            'quarterly': 4,
            'monthly': 12,
            'daily': 365
        }[compoundFrequency] || 12;

        const projections = [];
        let currentBalance = principal;
        let totalContributions = principal;

        for (let year = 1; year <= timeYears; year++) {
            const beginningBalance = currentBalance;
            const yearlyContributions = monthlyContribution * 12;

            // Calculate compound interest for the year
            const ratePerPeriod = interestRate / 100 / compoundsPerYear;
            const periodsInYear = compoundsPerYear;

            // Add monthly contributions throughout the year
            for (let month = 1; month <= 12; month++) {
                // Add monthly contribution
                currentBalance += monthlyContribution;
                totalContributions += monthlyContribution;

                // Apply compound interest for the month
                const monthlyPeriods = compoundsPerYear / 12;
                for (let period = 0; period < monthlyPeriods; period++) {
                    currentBalance = currentBalance * (1 + ratePerPeriod);
                }
            }

            const interestEarned = currentBalance - beginningBalance - yearlyContributions;

            projections.push({
                year,
                beginningBalance,
                contributions: yearlyContributions,
                interestEarned,
                endingBalance: currentBalance
            });
        }

        const totalInterest = currentBalance - totalContributions;
        const roi = totalContributions > 0 ? (totalInterest / totalContributions) * 100 : 0;

        return {
            finalValue: currentBalance,
            totalContributions,
            totalInterest,
            roi,
            projections
        };
    }

    // Generate comparison table HTML
    generateComparisonTable(containerId, comparisonType = 'mortgage') {
        const container = document.getElementById(containerId);
        if (!container || !this.comparisonResults) return;

        const comparison = this.comparisonResults;
        
        let tableHTML = '';
        
        if (comparisonType === 'mortgage') {
            tableHTML = `
                <div class="comparison-table-container">
                    <table class="comparison-table" role="table" aria-label="Loan Comparison">
                        <thead>
                            <tr>
                                <th scope="col">Metric</th>
                                <th scope="col">${comparison.scenarioA.label}</th>
                                <th scope="col">${comparison.scenarioB.label}</th>
                                <th scope="col">Difference</th>
                                <th scope="col">Better Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Monthly Payment</strong></td>
                                <td>${formatter.formatCurrency(comparison.scenarioA.monthlyPayment)}</td>
                                <td>${formatter.formatCurrency(comparison.scenarioB.monthlyPayment)}</td>
                                <td class="${comparison.differences.monthlyPayment > 0 ? 'negative' : 'positive'}">
                                    ${formatter.formatCurrency(Math.abs(comparison.differences.monthlyPayment))}
                                    ${comparison.differences.monthlyPayment > 0 ? 'higher' : 'lower'}
                                </td>
                                <td class="better-option">
                                    ${comparison.differences.monthlyPayment < 0 ? comparison.scenarioB.label : comparison.scenarioA.label}
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Total Interest</strong></td>
                                <td>${formatter.formatCurrency(comparison.scenarioA.totalInterest)}</td>
                                <td>${formatter.formatCurrency(comparison.scenarioB.totalInterest)}</td>
                                <td class="${comparison.differences.totalInterest > 0 ? 'negative' : 'positive'}">
                                    ${formatter.formatCurrency(Math.abs(comparison.differences.totalInterest))}
                                    ${comparison.differences.totalInterest > 0 ? 'more' : 'less'}
                                </td>
                                <td class="better-option">
                                    ${comparison.differences.totalInterest < 0 ? comparison.scenarioB.label : comparison.scenarioA.label}
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Total Amount Paid</strong></td>
                                <td>${formatter.formatCurrency(comparison.scenarioA.totalAmount)}</td>
                                <td>${formatter.formatCurrency(comparison.scenarioB.totalAmount)}</td>
                                <td class="${comparison.differences.totalAmount > 0 ? 'negative' : 'positive'}">
                                    ${formatter.formatCurrency(Math.abs(comparison.differences.totalAmount))}
                                    ${comparison.differences.totalAmount > 0 ? 'more' : 'less'}
                                </td>
                                <td class="better-option">
                                    ${comparison.differences.totalAmount < 0 ? comparison.scenarioB.label : comparison.scenarioA.label}
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Payoff Time</strong></td>
                                <td>${formatter.formatDuration(comparison.scenarioA.totalPayments)}</td>
                                <td>${formatter.formatDuration(comparison.scenarioB.totalPayments)}</td>
                                <td class="${comparison.differences.totalPayments > 0 ? 'negative' : 'positive'}">
                                    ${Math.abs(comparison.differences.totalPayments)} payments
                                    ${comparison.differences.totalPayments > 0 ? 'longer' : 'shorter'}
                                </td>
                                <td class="better-option">
                                    ${comparison.differences.totalPayments < 0 ? comparison.scenarioB.label : comparison.scenarioA.label}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
        } else if (comparisonType === 'investment') {
            tableHTML = `
                <div class="comparison-table-container">
                    <table class="comparison-table" role="table" aria-label="Investment Comparison">
                        <thead>
                            <tr>
                                <th scope="col">Metric</th>
                                <th scope="col">${comparison.scenarioA.label}</th>
                                <th scope="col">${comparison.scenarioB.label}</th>
                                <th scope="col">Difference</th>
                                <th scope="col">Better Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Final Value</strong></td>
                                <td>${formatter.formatCurrency(comparison.scenarioA.finalValue)}</td>
                                <td>${formatter.formatCurrency(comparison.scenarioB.finalValue)}</td>
                                <td class="${comparison.differences.finalValue < 0 ? 'negative' : 'positive'}">
                                    ${formatter.formatCurrency(Math.abs(comparison.differences.finalValue))}
                                    ${comparison.differences.finalValue > 0 ? 'more' : 'less'}
                                </td>
                                <td class="better-option">
                                    ${comparison.differences.finalValue > 0 ? comparison.scenarioB.label : comparison.scenarioA.label}
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Total Contributions</strong></td>
                                <td>${formatter.formatCurrency(comparison.scenarioA.totalContributions)}</td>
                                <td>${formatter.formatCurrency(comparison.scenarioB.totalContributions)}</td>
                                <td class="${comparison.differences.totalContributions > 0 ? 'negative' : 'positive'}">
                                    ${formatter.formatCurrency(Math.abs(comparison.differences.totalContributions))}
                                    ${comparison.differences.totalContributions > 0 ? 'more' : 'less'}
                                </td>
                                <td class="better-option">
                                    ${comparison.differences.totalContributions < 0 ? comparison.scenarioB.label : comparison.scenarioA.label}
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Interest Earned</strong></td>
                                <td>${formatter.formatCurrency(comparison.scenarioA.totalInterest)}</td>
                                <td>${formatter.formatCurrency(comparison.scenarioB.totalInterest)}</td>
                                <td class="${comparison.differences.totalInterest < 0 ? 'negative' : 'positive'}">
                                    ${formatter.formatCurrency(Math.abs(comparison.differences.totalInterest))}
                                    ${comparison.differences.totalInterest > 0 ? 'more' : 'less'}
                                </td>
                                <td class="better-option">
                                    ${comparison.differences.totalInterest > 0 ? comparison.scenarioB.label : comparison.scenarioA.label}
                                </td>
                            </tr>
                            <tr>
                                <td><strong>ROI</strong></td>
                                <td>${comparison.scenarioA.roi.toFixed(2)}%</td>
                                <td>${comparison.scenarioB.roi.toFixed(2)}%</td>
                                <td class="${comparison.differences.roi < 0 ? 'negative' : 'positive'}">
                                    ${Math.abs(comparison.differences.roi).toFixed(2)}%
                                    ${comparison.differences.roi > 0 ? 'higher' : 'lower'}
                                </td>
                                <td class="better-option">
                                    ${comparison.differences.roi > 0 ? comparison.scenarioB.label : comparison.scenarioA.label}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
        }

        container.innerHTML = tableHTML;
    }

    // Generate comparison charts
    generateComparisonCharts(chartContainerId, comparisonType = 'mortgage') {
        if (!this.comparisonResults) return;

        const comparison = this.comparisonResults;

        if (comparisonType === 'mortgage') {
            // Create balance comparison chart
            charts.createComparisonChart(
                chartContainerId,
                comparison.scenarioA.schedule,
                comparison.scenarioB.schedule,
                comparison.scenarioA.label,
                comparison.scenarioB.label
            );
        } else if (comparisonType === 'investment') {
            // Create investment growth comparison chart
            const dataA = comparison.scenarioA.projections.map((p, i) => ({ 
                paymentNumber: i + 1, 
                balance: p.endingBalance 
            }));
            const dataB = comparison.scenarioB.projections.map((p, i) => ({ 
                paymentNumber: i + 1, 
                balance: p.endingBalance 
            }));

            charts.createComparisonChart(
                chartContainerId,
                dataA,
                dataB,
                comparison.scenarioA.label,
                comparison.scenarioB.label
            );
        }
    }

    // Calculate time difference in months
    calculateTimeDifference(date1, date2) {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const monthsDiff = Math.round(daysDiff / 30);
        return monthsDiff;
    }

    // Generate summary recommendation
    generateRecommendation() {
        if (!this.comparisonResults) return null;

        const comparison = this.comparisonResults;
        const scoreA = this.calculateScenarioScore(comparison.scenarioA, comparison.differences, 'A');
        const scoreB = this.calculateScenarioScore(comparison.scenarioB, comparison.differences, 'B');

        const betterOption = scoreA > scoreB ? 'A' : 'B';
        const betterScenario = betterOption === 'A' ? comparison.scenarioA : comparison.scenarioB;
        const worseScenario = betterOption === 'A' ? comparison.scenarioB : comparison.scenarioA;

        return {
            recommendation: betterScenario.label,
            reasonsFor: this.getRecommendationReasons(comparison, betterOption),
            tradeoffs: this.getTradeoffs(comparison, betterOption),
            confidence: Math.abs(scoreA - scoreB) > 2 ? 'High' : 'Medium'
        };
    }

    // Calculate scenario score (higher is better)
    calculateScenarioScore(scenario, differences, scenarioKey) {
        let score = 0;

        // For mortgage comparisons
        if (scenario.monthlyPayment !== undefined) {
            // Lower monthly payment is better
            score += scenarioKey === 'A' ? 
                (differences.monthlyPayment > 0 ? 2 : -2) : 
                (differences.monthlyPayment < 0 ? 2 : -2);

            // Lower total interest is better
            score += scenarioKey === 'A' ? 
                (differences.totalInterest > 0 ? 3 : -3) : 
                (differences.totalInterest < 0 ? 3 : -3);

            // Shorter payoff time is better
            score += scenarioKey === 'A' ? 
                (differences.totalPayments > 0 ? 1 : -1) : 
                (differences.totalPayments < 0 ? 1 : -1);
        }

        // For investment comparisons
        if (scenario.finalValue !== undefined) {
            // Higher final value is better
            score += scenarioKey === 'A' ? 
                (differences.finalValue < 0 ? 3 : -3) : 
                (differences.finalValue > 0 ? 3 : -3);

            // Higher ROI is better
            score += scenarioKey === 'A' ? 
                (differences.roi < 0 ? 2 : -2) : 
                (differences.roi > 0 ? 2 : -2);
        }

        return score;
    }

    // Get recommendation reasons
    getRecommendationReasons(comparison, betterOption) {
        const reasons = [];
        const better = betterOption === 'A' ? comparison.scenarioA : comparison.scenarioB;
        const diff = comparison.differences;

        if (better.monthlyPayment !== undefined) {
            if ((betterOption === 'A' && diff.monthlyPayment > 0) || (betterOption === 'B' && diff.monthlyPayment < 0)) {
                reasons.push(`Lower monthly payment by ${formatter.formatCurrency(Math.abs(diff.monthlyPayment))}`);
            }
            if ((betterOption === 'A' && diff.totalInterest > 0) || (betterOption === 'B' && diff.totalInterest < 0)) {
                reasons.push(`Saves ${formatter.formatCurrency(Math.abs(diff.totalInterest))} in total interest`);
            }
            if ((betterOption === 'A' && diff.totalPayments > 0) || (betterOption === 'B' && diff.totalPayments < 0)) {
                reasons.push(`Pays off ${Math.abs(diff.totalPayments)} payments earlier`);
            }
        }

        if (better.finalValue !== undefined) {
            if ((betterOption === 'A' && diff.finalValue < 0) || (betterOption === 'B' && diff.finalValue > 0)) {
                reasons.push(`Higher final value by ${formatter.formatCurrency(Math.abs(diff.finalValue))}`);
            }
            if ((betterOption === 'A' && diff.roi < 0) || (betterOption === 'B' && diff.roi > 0)) {
                reasons.push(`Better ROI by ${Math.abs(diff.roi).toFixed(2)}%`);
            }
        }

        return reasons;
    }

    // Get tradeoffs
    getTradeoffs(comparison, betterOption) {
        const tradeoffs = [];
        const worse = betterOption === 'A' ? comparison.scenarioB : comparison.scenarioA;
        const diff = comparison.differences;

        if (worse.monthlyPayment !== undefined) {
            if ((betterOption === 'A' && diff.monthlyPayment < 0) || (betterOption === 'B' && diff.monthlyPayment > 0)) {
                tradeoffs.push(`Higher monthly payment by ${formatter.formatCurrency(Math.abs(diff.monthlyPayment))}`);
            }
            if ((betterOption === 'A' && diff.totalContributions < 0) || (betterOption === 'B' && diff.totalContributions > 0)) {
                tradeoffs.push(`Requires ${formatter.formatCurrency(Math.abs(diff.totalContributions))} more in contributions`);
            }
        }

        return tradeoffs;
    }

    // Reset comparison data
    reset() {
        this.scenarios = { A: {}, B: {} };
        this.comparisonResults = null;
    }
}

// Export singleton instance
export const comparator = new FinanceComparator();