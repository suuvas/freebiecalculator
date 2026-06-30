// CSV export utilities for financial data
import { formatter } from './format.js';

export class FinanceExporter {
    constructor() {
        this.csvSeparator = ',';
        this.lineBreak = '\n';
    }

    // Export amortization schedule to CSV
    exportAmortizationSchedule(schedule, filename = 'amortization_schedule.csv', includeExtra = false) {
        const headers = includeExtra ? 
            ['Payment #', 'Date', 'Payment', 'Principal', 'Interest', 'Extra Payment', 'Balance'] :
            ['Payment #', 'Date', 'Payment', 'Principal', 'Interest', 'Balance'];

        const rows = schedule.map(payment => {
            const baseRow = [
                payment.paymentNumber,
                payment.date.toLocaleDateString(),
                this.formatForCSV(payment.payment),
                this.formatForCSV(payment.principal),
                this.formatForCSV(payment.interest),
                this.formatForCSV(payment.balance)
            ];

            if (includeExtra) {
                baseRow.splice(-1, 0, this.formatForCSV(payment.extraPayment || 0));
            }

            return baseRow;
        });

        this.downloadCSV(headers, rows, filename);
    }

    // Export annual summary to CSV
    exportAnnualSummary(annualData, filename = 'annual_summary.csv') {
        const headers = ['Year', 'Total Payments', 'Principal Paid', 'Interest Paid', 'Extra Payments', 'Ending Balance', 'Payment Count'];
        
        const rows = annualData.map(data => [
            data.year,
            this.formatForCSV(data.totalPayments),
            this.formatForCSV(data.totalPrincipal),
            this.formatForCSV(data.totalInterest),
            this.formatForCSV(data.totalExtra || 0),
            this.formatForCSV(data.endingBalance),
            data.paymentCount
        ]);

        this.downloadCSV(headers, rows, filename);
    }

    // Export comparison data to CSV
    exportComparison(comparisonData, filename = 'loan_comparison.csv') {
        const headers = ['Metric', 'Option A', 'Option B', 'Difference'];
        
        const rows = [
            ['Monthly Payment', 
             this.formatForCSV(comparisonData.optionA.monthlyPayment),
             this.formatForCSV(comparisonData.optionB.monthlyPayment),
             this.formatForCSV(comparisonData.optionB.monthlyPayment - comparisonData.optionA.monthlyPayment)
            ],
            ['Total Interest',
             this.formatForCSV(comparisonData.optionA.totalInterest),
             this.formatForCSV(comparisonData.optionB.totalInterest),
             this.formatForCSV(comparisonData.optionB.totalInterest - comparisonData.optionA.totalInterest)
            ],
            ['Total Amount Paid',
             this.formatForCSV(comparisonData.optionA.totalAmount),
             this.formatForCSV(comparisonData.optionB.totalAmount),
             this.formatForCSV(comparisonData.optionB.totalAmount - comparisonData.optionA.totalAmount)
            ],
            ['Total Payments',
             comparisonData.optionA.totalPayments,
             comparisonData.optionB.totalPayments,
             comparisonData.optionB.totalPayments - comparisonData.optionA.totalPayments
            ],
            ['Payoff Date',
             comparisonData.optionA.payoffDate.toLocaleDateString(),
             comparisonData.optionB.payoffDate.toLocaleDateString(),
             this.calculateTimeDifference(comparisonData.optionA.payoffDate, comparisonData.optionB.payoffDate)
            ]
        ];

        this.downloadCSV(headers, rows, filename);
    }

    // Export compound interest projections to CSV
    exportCompoundInterest(projections, filename = 'compound_interest_projections.csv') {
        const headers = ['Year', 'Beginning Balance', 'Contributions', 'Interest Earned', 'Ending Balance'];
        
        const rows = projections.map(projection => [
            projection.year,
            this.formatForCSV(projection.beginningBalance),
            this.formatForCSV(projection.contributions),
            this.formatForCSV(projection.interestEarned),
            this.formatForCSV(projection.endingBalance)
        ]);

        this.downloadCSV(headers, rows, filename);
    }

    // Export ROI analysis to CSV
    exportROIAnalysis(roiData, filename = 'roi_analysis.csv') {
        const headers = ['Metric', 'Value'];
        
        const rows = [
            ['Initial Investment', this.formatForCSV(roiData.initialInvestment)],
            ['Final Value', this.formatForCSV(roiData.finalValue)],
            ['Total Gain/Loss', this.formatForCSV(roiData.totalGain)],
            ['ROI Percentage', roiData.roiPercentage.toFixed(2) + '%'],
            ['Annualized Return', roiData.annualizedReturn.toFixed(2) + '%'],
            ['Investment Period', roiData.investmentPeriod + ' years'],
            ['Fees', this.formatForCSV(roiData.fees || 0)],
            ['Net Gain/Loss', this.formatForCSV(roiData.netGain)]
        ];

        this.downloadCSV(headers, rows, filename);
    }

    // Export savings goal projections to CSV
    exportSavingsGoal(goalData, filename = 'savings_goal_projection.csv') {
        const headers = ['Year', 'Beginning Balance', 'Contributions', 'Interest Earned', 'Ending Balance', 'Goal Progress'];
        
        const rows = goalData.projections.map(projection => [
            projection.year,
            this.formatForCSV(projection.beginningBalance),
            this.formatForCSV(projection.contributions),
            this.formatForCSV(projection.interestEarned),
            this.formatForCSV(projection.endingBalance),
            (projection.endingBalance / goalData.savingsGoal * 100).toFixed(1) + '%'
        ]);

        // Add summary information
        rows.unshift(['Summary Information', '', '', '', '', '']);
        rows.unshift(['Savings Goal', this.formatForCSV(goalData.savingsGoal), '', '', '', '']);
        rows.unshift(['Monthly Contribution Needed', this.formatForCSV(goalData.monthlyContributionNeeded), '', '', '', '']);
        rows.unshift(['Time to Goal', goalData.timeToGoal + ' years', '', '', '', '']);
        rows.unshift(['', '', '', '', '', '']); // Empty row for separation

        this.downloadCSV(headers, rows, filename);
    }

    // Export calculator summary to CSV
    exportCalculatorSummary(summaryData, calculatorType, filename = null) {
        if (!filename) {
            filename = `${calculatorType}_summary_${new Date().toISOString().split('T')[0]}.csv`;
        }

        const headers = ['Field', 'Value'];
        const rows = Object.entries(summaryData).map(([key, value]) => [
            this.formatFieldName(key),
            typeof value === 'number' ? this.formatForCSV(value) : value
        ]);

        this.downloadCSV(headers, rows, filename);
    }

    // Format numbers for CSV (remove commas, keep decimals)
    formatForCSV(number) {
        if (typeof number !== 'number') return number;
        return number.toFixed(2);
    }

    // Format field names for display
    formatFieldName(fieldName) {
        return fieldName
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    }

    // Calculate time difference in readable format
    calculateTimeDifference(date1, date2) {
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffMonths = Math.round(diffDays / 30);
        const diffYears = Math.round(diffDays / 365);

        if (diffYears > 0) {
            return `${diffYears} year${diffYears !== 1 ? 's' : ''}`;
        } else if (diffMonths > 0) {
            return `${diffMonths} month${diffMonths !== 1 ? 's' : ''}`;
        } else {
            return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
        }
    }

    // Create and download CSV file
    downloadCSV(headers, rows, filename) {
        const csvContent = [
            headers.join(this.csvSeparator),
            ...rows.map(row => row.join(this.csvSeparator))
        ].join(this.lineBreak);

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        
        // Create download link
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up
        URL.revokeObjectURL(url);

        // Show success message
        this.showExportSuccess(filename);
    }

    // Show export success notification
    showExportSuccess(filename) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'export-toast';
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">📄</span>
                <span class="toast-message">Exported: ${filename}</span>
            </div>
        `;
        
        // Add styles
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-size: 14px;
            animation: slideInRight 0.3s ease-out;
        `;

        // Add animation keyframes
        if (!document.querySelector('#export-toast-styles')) {
            const style = document.createElement('style');
            style.id = 'export-toast-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .toast-content {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(toast);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.animation = 'slideInRight 0.3s ease-out reverse';
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 300);
            }
        }, 3000);
    }

    // Batch export multiple data sets
    exportBatch(exports, zipFilename = null) {
        if (!zipFilename) {
            zipFilename = `financial_data_${new Date().toISOString().split('T')[0]}.zip`;
        }

        // Note: This would require a ZIP library for full implementation
        // For now, we'll export each file individually
        exports.forEach((exportData, index) => {
            setTimeout(() => {
                this.downloadCSV(exportData.headers, exportData.rows, exportData.filename);
            }, index * 1000); // Stagger downloads to avoid browser blocking
        });
    }
}

// Export singleton instance
export const exporter = new FinanceExporter();