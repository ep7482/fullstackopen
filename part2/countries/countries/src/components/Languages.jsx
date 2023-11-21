const Languages = ({langs}) => {
    return (
        <div>
            <b>Languages:</b>
            {langs.map(lang =>
                <li key={langs.indexOf(lang)}>
                    {lang}
                </li>
            )}
        </div>
    )
}

export default Languages