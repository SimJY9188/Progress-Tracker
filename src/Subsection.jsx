function Subsection ({ index, sectionIndex, updateListFunction, subtitle, completed }) {
    return (
        <div className="flex w-full justify-between items-center">
            <h4 className="font-bold text-lg">
                <span className="inline-block mr-4">{index + 1}.</span> {subtitle}
            </h4>

            <input type="checkbox" className="border rounded w-4 h-4 accent-emerald-500"
                   onChange={() => updateListFunction(sectionIndex, index)} checked={completed}/>
        </div>
    )
}

export default Subsection;