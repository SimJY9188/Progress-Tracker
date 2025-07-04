export const findOverallProgress = (list) => {
    let totalProgress = 0;
    for (let i = 0; i < list.length; i++) {
        totalProgress += list[i].progress;
    }
    return Math.round((totalProgress / (list.length * 100)) * 100);
}

export const findSectionProgress = (subsections) => {
    let completed = 0;
    for (let i = 0; i < subsections.length; i++) {
        if (subsections[i].completed) completed++;
    }
    return Math.round((completed / subsections.length) * 100);
}