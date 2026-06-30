// SVG chart generation for financial calculators
import { formatter } from './format.js';

export class FinanceCharts {
    constructor() {
        this.colors = {
            primary: '#4f46e5',
            secondary: '#06b6d4',
            success: '#10b981',
            warning: '#f59e0b',
            danger: '#ef4444',
            gray: '#6b7280',
            light: '#f3f4f6'
        };
    }

    // Create balance over time line chart
    createBalanceChart(containerId, scheduleData, width = 600, height = 300) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const maxBalance = Math.max(...scheduleData.map(d => d.balance));
        const maxPayment = scheduleData.length;

        const svg = this.createBaseSVG(width, height);
        
        // Chart margins
        const margin = { top: 20, right: 30, bottom: 40, left: 80 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        // Create chart group
        const chartGroup = this.createSVGElement('g', {
            transform: `translate(${margin.left},${margin.top})`
        });

        // Generate line path
        const points = scheduleData.map((d, i) => {
            const x = (i / (maxPayment - 1)) * chartWidth;
            const y = chartHeight - (d.balance / maxBalance) * chartHeight;
            return `${x},${y}`;
        });

        const pathData = `M${points.join('L')}`;

        // Add line
        const line = this.createSVGElement('path', {
            d: pathData,
            fill: 'none',
            stroke: this.colors.primary,
            'stroke-width': '2',
            'stroke-linecap': 'round'
        });

        // Add area under curve
        const areaData = `${pathData}L${chartWidth},${chartHeight}L0,${chartHeight}Z`;
        const area = this.createSVGElement('path', {
            d: areaData,
            fill: this.colors.primary,
            'fill-opacity': '0.1'
        });

        // Add axes
        this.addAxis(chartGroup, 'x', chartWidth, chartHeight, 0, maxPayment, 'Payment #');
        this.addAxis(chartGroup, 'y', chartWidth, chartHeight, 0, maxBalance, 'Balance', true);

        chartGroup.appendChild(area);
        chartGroup.appendChild(line);
        svg.appendChild(chartGroup);

        // Add title
        this.addChartTitle(svg, 'Loan Balance Over Time', width);

        container.innerHTML = '';
        container.appendChild(svg);
    }

    // Create principal vs interest stacked bar chart
    createPrincipalInterestChart(containerId, annualData, width = 600, height = 300) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const maxAmount = Math.max(...annualData.map(d => d.totalPayments));

        const svg = this.createBaseSVG(width, height);
        const margin = { top: 20, right: 30, bottom: 40, left: 80 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        const chartGroup = this.createSVGElement('g', {
            transform: `translate(${margin.left},${margin.top})`
        });

        const barWidth = chartWidth / annualData.length * 0.8;
        const barSpacing = chartWidth / annualData.length;

        annualData.forEach((data, i) => {
            const x = i * barSpacing + (barSpacing - barWidth) / 2;
            
            // Principal bar (bottom)
            const principalHeight = (data.totalPrincipal / maxAmount) * chartHeight;
            const principalBar = this.createSVGElement('rect', {
                x: x,
                y: chartHeight - principalHeight,
                width: barWidth,
                height: principalHeight,
                fill: this.colors.primary
            });

            // Interest bar (top)
            const interestHeight = (data.totalInterest / maxAmount) * chartHeight;
            const interestBar = this.createSVGElement('rect', {
                x: x,
                y: chartHeight - principalHeight - interestHeight,
                width: barWidth,
                height: interestHeight,
                fill: this.colors.warning
            });

            chartGroup.appendChild(principalBar);
            chartGroup.appendChild(interestBar);

            // Year labels
            const yearLabel = this.createSVGElement('text', {
                x: x + barWidth / 2,
                y: chartHeight + 20,
                'text-anchor': 'middle',
                'font-size': '12',
                fill: this.colors.gray
            });
            yearLabel.textContent = data.year;
            chartGroup.appendChild(yearLabel);
        });

        // Add Y axis
        this.addAxis(chartGroup, 'y', chartWidth, chartHeight, 0, maxAmount, 'Amount', true);

        // Add legend
        this.addLegend(chartGroup, [
            { color: this.colors.primary, label: 'Principal' },
            { color: this.colors.warning, label: 'Interest' }
        ], chartWidth - 120, 20);

        svg.appendChild(chartGroup);
        this.addChartTitle(svg, 'Annual Principal vs Interest', width);

        container.innerHTML = '';
        container.appendChild(svg);
    }

    // Create donut chart for total cost breakdown
    createCostBreakdownChart(containerId, principal, interest, size = 250) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const total = principal + interest;
        const principalPercent = (principal / total) * 100;
        const interestPercent = (interest / total) * 100;

        const svg = this.createBaseSVG(size, size);
        const centerX = size / 2;
        const centerY = size / 2;
        const radius = size / 2 - 40;
        const innerRadius = radius * 0.6;

        // Calculate angles
        const principalAngle = (principalPercent / 100) * 360;
        const interestAngle = (interestPercent / 100) * 360;

        // Create donut slices
        const principalPath = this.createDonutSlice(centerX, centerY, innerRadius, radius, 0, principalAngle);
        const interestPath = this.createDonutSlice(centerX, centerY, innerRadius, radius, principalAngle, principalAngle + interestAngle);

        const principalSlice = this.createSVGElement('path', {
            d: principalPath,
            fill: this.colors.primary,
            stroke: 'white',
            'stroke-width': '2'
        });

        const interestSlice = this.createSVGElement('path', {
            d: interestPath,
            fill: this.colors.warning,
            stroke: 'white',
            'stroke-width': '2'
        });

        svg.appendChild(principalSlice);
        svg.appendChild(interestSlice);

        // Add center text
        const centerText = this.createSVGElement('text', {
            x: centerX,
            y: centerY - 10,
            'text-anchor': 'middle',
            'font-size': '16',
            'font-weight': 'bold',
            fill: this.colors.gray
        });
        centerText.textContent = 'Total Cost';

        const centerAmount = this.createSVGElement('text', {
            x: centerX,
            y: centerY + 10,
            'text-anchor': 'middle',
            'font-size': '14',
            fill: this.colors.gray
        });
        centerAmount.textContent = formatter.formatCurrency(total);

        svg.appendChild(centerText);
        svg.appendChild(centerAmount);

        // Add legend with percentages
        this.addDonutLegend(svg, [
            { color: this.colors.primary, label: `Principal (${principalPercent.toFixed(1)}%)`, value: principal },
            { color: this.colors.warning, label: `Interest (${interestPercent.toFixed(1)}%)`, value: interest }
        ], size);

        container.innerHTML = '';
        container.appendChild(svg);
    }

    // Create comparison chart (A vs B)
    createComparisonChart(containerId, dataA, dataB, labelA = 'Option A', labelB = 'Option B', width = 700, height = 300) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const maxLength = Math.max(dataA.length, dataB.length);
        const maxBalance = Math.max(
            Math.max(...dataA.map(d => d.balance)),
            Math.max(...dataB.map(d => d.balance))
        );

        const svg = this.createBaseSVG(width, height);
        const margin = { top: 20, right: 30, bottom: 40, left: 80 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        const chartGroup = this.createSVGElement('g', {
            transform: `translate(${margin.left},${margin.top})`
        });

        // Create line for option A
        const pointsA = dataA.map((d, i) => {
            const x = (i / (maxLength - 1)) * chartWidth;
            const y = chartHeight - (d.balance / maxBalance) * chartHeight;
            return `${x},${y}`;
        });

        const lineA = this.createSVGElement('path', {
            d: `M${pointsA.join('L')}`,
            fill: 'none',
            stroke: this.colors.primary,
            'stroke-width': '2',
            'stroke-dasharray': '5,5'
        });

        // Create line for option B
        const pointsB = dataB.map((d, i) => {
            const x = (i / (maxLength - 1)) * chartWidth;
            const y = chartHeight - (d.balance / maxBalance) * chartHeight;
            return `${x},${y}`;
        });

        const lineB = this.createSVGElement('path', {
            d: `M${pointsB.join('L')}`,
            fill: 'none',
            stroke: this.colors.secondary,
            'stroke-width': '2'
        });

        // Add axes
        this.addAxis(chartGroup, 'x', chartWidth, chartHeight, 0, maxLength, 'Payment #');
        this.addAxis(chartGroup, 'y', chartWidth, chartHeight, 0, maxBalance, 'Balance', true);

        chartGroup.appendChild(lineA);
        chartGroup.appendChild(lineB);

        // Add legend
        this.addLegend(chartGroup, [
            { color: this.colors.primary, label: labelA, dashed: true },
            { color: this.colors.secondary, label: labelB }
        ], chartWidth - 150, 20);

        svg.appendChild(chartGroup);
        this.addChartTitle(svg, 'Loan Balance Comparison', width);

        container.innerHTML = '';
        container.appendChild(svg);
    }

    // Utility methods
    createBaseSVG(width, height) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        svg.style.maxWidth = '100%';
        svg.style.height = 'auto';
        return svg;
    }

    createSVGElement(tag, attributes = {}) {
        const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        return element;
    }

    createDonutSlice(centerX, centerY, innerRadius, outerRadius, startAngle, endAngle) {
        const startAngleRad = (startAngle - 90) * Math.PI / 180;
        const endAngleRad = (endAngle - 90) * Math.PI / 180;

        const x1 = centerX + outerRadius * Math.cos(startAngleRad);
        const y1 = centerY + outerRadius * Math.sin(startAngleRad);
        const x2 = centerX + outerRadius * Math.cos(endAngleRad);
        const y2 = centerY + outerRadius * Math.sin(endAngleRad);
        const x3 = centerX + innerRadius * Math.cos(endAngleRad);
        const y3 = centerY + innerRadius * Math.sin(endAngleRad);
        const x4 = centerX + innerRadius * Math.cos(startAngleRad);
        const y4 = centerY + innerRadius * Math.sin(startAngleRad);

        const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

        return [
            `M ${x1} ${y1}`,
            `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            `L ${x3} ${y3}`,
            `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
            'Z'
        ].join(' ');
    }

    addAxis(parent, type, width, height, min, max, label, isCurrency = false) {
        const isXAxis = type === 'x';
        const tickCount = 5;
        const step = (max - min) / tickCount;

        for (let i = 0; i <= tickCount; i++) {
            const value = min + (step * i);
            const pos = (i / tickCount) * (isXAxis ? width : height);

            // Tick mark
            const tick = this.createSVGElement('line', {
                x1: isXAxis ? pos : 0,
                y1: isXAxis ? height : height - pos,
                x2: isXAxis ? pos : -5,
                y2: isXAxis ? height + 5 : height - pos,
                stroke: this.colors.gray,
                'stroke-width': '1'
            });

            // Tick label
            const tickLabel = this.createSVGElement('text', {
                x: isXAxis ? pos : -10,
                y: isXAxis ? height + 20 : height - pos + 5,
                'text-anchor': isXAxis ? 'middle' : 'end',
                'font-size': '12',
                fill: this.colors.gray
            });

            if (isCurrency && !isXAxis) {
                tickLabel.textContent = formatter.abbreviateNumber(value);
            } else {
                tickLabel.textContent = Math.round(value).toString();
            }

            parent.appendChild(tick);
            parent.appendChild(tickLabel);
        }

        // Axis line
        const axisLine = this.createSVGElement('line', {
            x1: 0,
            y1: isXAxis ? height : height,
            x2: isXAxis ? width : 0,
            y2: isXAxis ? height : 0,
            stroke: this.colors.gray,
            'stroke-width': '1'
        });
        parent.appendChild(axisLine);

        // Axis label
        const axisLabel = this.createSVGElement('text', {
            x: isXAxis ? width / 2 : -50,
            y: isXAxis ? height + 35 : height / 2,
            'text-anchor': 'middle',
            'font-size': '14',
            'font-weight': 'bold',
            fill: this.colors.gray,
            transform: isXAxis ? '' : `rotate(-90, -50, ${height / 2})`
        });
        axisLabel.textContent = label;
        parent.appendChild(axisLabel);
    }

    addLegend(parent, items, x, y) {
        items.forEach((item, i) => {
            const legendY = y + (i * 20);

            // Color box or line
            if (item.dashed) {
                const legendLine = this.createSVGElement('line', {
                    x1: x,
                    y1: legendY,
                    x2: x + 15,
                    y2: legendY,
                    stroke: item.color,
                    'stroke-width': '2',
                    'stroke-dasharray': '5,5'
                });
                parent.appendChild(legendLine);
            } else {
                const legendBox = this.createSVGElement('rect', {
                    x: x,
                    y: legendY - 5,
                    width: 15,
                    height: 10,
                    fill: item.color
                });
                parent.appendChild(legendBox);
            }

            // Label
            const legendLabel = this.createSVGElement('text', {
                x: x + 20,
                y: legendY + 3,
                'font-size': '12',
                fill: this.colors.gray
            });
            legendLabel.textContent = item.label;
            parent.appendChild(legendLabel);
        });
    }

    addDonutLegend(svg, items, size) {
        const legendY = size - 60;
        items.forEach((item, i) => {
            const legendX = 20;
            const itemY = legendY + (i * 25);

            // Color box
            const legendBox = this.createSVGElement('rect', {
                x: legendX,
                y: itemY,
                width: 15,
                height: 15,
                fill: item.color
            });

            // Label and value
            const legendLabel = this.createSVGElement('text', {
                x: legendX + 20,
                y: itemY + 12,
                'font-size': '12',
                fill: this.colors.gray
            });
            legendLabel.textContent = `${item.label}: ${formatter.formatCurrency(item.value)}`;

            svg.appendChild(legendBox);
            svg.appendChild(legendLabel);
        });
    }

    addChartTitle(svg, title, width) {
        const titleElement = this.createSVGElement('text', {
            x: width / 2,
            y: 15,
            'text-anchor': 'middle',
            'font-size': '16',
            'font-weight': 'bold',
            fill: this.colors.gray
        });
        titleElement.textContent = title;
        svg.appendChild(titleElement);
    }
}

// Export singleton instance
export const charts = new FinanceCharts();