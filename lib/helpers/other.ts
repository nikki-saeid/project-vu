export const getProjectCostLabel = (cost: string ) => {
    const costInt = parseInt(cost);

    return `${
        costInt >= 1000000000
            ? parseFloat((costInt / 1000000000).toFixed(1)) + 'B'
            : costInt >= 1000000
              ? parseFloat((costInt / 1000000).toFixed(1)) + 'M'
              : parseFloat((costInt / 1000).toFixed(1)) + 'K'
    } AUD`;
};
