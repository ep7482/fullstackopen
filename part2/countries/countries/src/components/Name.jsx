const Name = ({name, len}) => {
    if (len === 1) {
        return (
            <h1>{name}</h1>
        )
    }
    return (
        <>{name}</>
    )
}

export default Name