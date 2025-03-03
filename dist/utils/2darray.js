export function rotate2dArray(matrix, direction) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    let rotated = Array.from({ length: cols }, () => Array(rows).fill(0));
    if (direction >= 0) {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                rotated[j][rows - 1 - i] = matrix[i][j];
            }
        }
    }
    else {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                rotated[cols - 1 - j][i] = matrix[i][j];
            }
        }
    }
    return rotated;
}
export function countMatchingElements(matrix, filterFn) {
    return matrix.flat().filter(filterFn).length;
}
