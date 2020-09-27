

/* 
    @params:{
        
    }
*/
export const isCurrentTab = (history, path) => {
    return (
        ((history
            &&
            history.location
            && history.location.pathname
        ) && (String(history.location.pathname).includes(path)))
    )
}