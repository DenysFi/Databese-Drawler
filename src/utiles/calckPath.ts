interface ICalcPath {
    width: number,
    x1: number,
    x2: number,
    y1: number,
    y2: number
}

export function calcPath({ x1, x2, y1, y2, width }: ICalcPath) {
    const midX = (x2 + x1 + width) / 2;
    let radius = 10;

    if (Math.abs(y1 - y2) <= 30) {
        radius = Math.abs(y2 - y1) / 3;
        // если радиус оказался меньше двух, то рисовать полукруг нет смысла, и мы рисуем прямую линию
        if (radius <= 2) {
            if (x1 + width <= x2) return `M ${x1 + width} ${y1} L ${x2} ${y2 + 0.1}`;
            else if (x2 + width < x1)
                return `M ${x1} ${y1} L ${x2 + width} ${y2}`;
        }
    }
    if (y1 < y2) {
        if (x1 + width < x2) {
            return `M ${x1 + width} ${y1} 
            L ${midX - radius} ${y1 + 0.1} 
            A ${radius} ${radius} 0 0 1 ${midX} ${y1 + radius} 
            L ${midX} ${y2 - radius} 
            A ${radius} ${radius} 0 0 0 ${midX + radius} ${y2} 
            L ${x2} ${y2}`;
        } else if (x1 >= x2 + width) {
            return `M ${x1} ${y1} 
            L ${midX + radius} ${y1 + 0.1} 
            A ${radius} ${radius} 0 0 0 ${midX} ${y1 + radius} 
            L ${midX} ${y2 - radius} 
            A ${radius} ${radius} 0 0 1 ${midX - radius} ${y2} 
            L ${x2} ${y2}`;
        } else if (x1 > x2 && x2 <= x1 + width) {
            const x2offset = x2 - 20;
            return `M ${x1} ${y1} 
            L ${x2offset} ${y1 + 0.1} 
            A ${radius} ${radius} 0 0 0 ${x2offset - radius} ${y1 + radius} 
            L ${x2offset - radius} ${y2 - radius} 
            A ${radius} ${radius} 0 0 0 ${x2offset} ${y2} 
            L ${x2} ${y2}`;
        } else if (x2 > x1 && x2 <= x1 + width) {
            const x2offset = x2 + width + 20;
            return `M ${x1} ${y1} 
            L ${x2offset} ${y1 + 0.1} 
            A ${radius} ${radius} 0 0 1 ${x2offset + radius} ${y1 + radius} 
            L ${x2offset + radius} ${y2 - radius} 
            A ${radius} ${radius} 0 0 1 ${x2offset} ${y2} 
            L ${x2} ${y2}`;
        }
    } else {
        if (x1 + width < x2) {
            return `M ${x1 + width} ${y1} 
            L ${midX - radius} ${y1 + 0.1} 
            A ${radius} ${radius} 0 0 0 ${midX} ${y1 - radius} 
            L ${midX} ${y2 + radius} 
            A ${radius} ${radius} 0 0 1 ${midX + radius} ${y2} 
            L ${x2} ${y2}`;
        } else if (x1 >= x2 + width) {
            return `M ${x1} ${y1} 
            L ${midX + radius} ${y1 + 0.1} 
            A ${radius} ${radius} 0 0 1 ${midX} ${y1 - radius} 
            L ${midX} ${y2 + radius} 
            A ${radius} ${radius} 0 0 0 ${midX - radius} ${y2} 
            L ${x2} ${y2}`;
        } else if (x1 > x2 && x2 <= x1 + width) {
            const x2offset = x2 - 20;
            return `M ${x1} ${y1} 
            L ${x2offset} ${y1 + 0.1} 
            A ${radius} ${radius} 0 0 1 ${x2offset - radius} ${y1 - radius} 
            L ${x2offset - radius} ${y2 + radius} 
            A ${radius} ${radius} 0 0 1 ${x2offset} ${y2} 
            L ${x2} ${y2}`;
        } else if (x2 > x1 && x2 <= x1 + width) {
            const x2offset = x2 + width + 20;
            return `M ${x1} ${y1} 
            L ${x2offset} ${y1 + 0.1} 
            A ${radius} ${radius} 0 0 0 ${x2offset + radius} ${y1 - radius} 
            L ${x2offset + radius} ${y2 + radius} 
            A ${radius} ${radius} 0 0 0 ${x2offset} ${y2} 
            L ${x2} ${y2}`;
        }
    }
}