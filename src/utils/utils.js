
/**
 * Returns time passed string from target date
 * @param {Date} target 
 */
export function getTimePassedStr(target){
    const now = new Date();
    const diff = new Date(now - target);

    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if(years > 0){
        return years + 'y';
    }
    else if(days > 0){
        return days + 'd';
    }
    else if(hours > 0){
        return hours + 'h';
    }
    else if(minutes > 0){
        return minutes + 'm';
    }
    else{
        return 'now';
    }
}