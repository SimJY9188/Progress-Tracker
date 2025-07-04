import React, {useState, useEffect} from "react";
import Section from "./Section.jsx";

import dsaTrackerList from "./utils/dsaTrackerList.js";
import {findOverallProgress, findSectionProgress} from "./utils/calculateProgress.js";

function ProgressTracker () {
    const [dsaList, setDsaList] = useState([]);
    const [overallProgress, setOverallProgress] = useState(0);

    // encourage to use 'loaded' flag if overallProgress is depending on dsaList
    const [loadedList, setLoadedList] = useState(false);

    useEffect(() => {
        const localList = JSON.parse(localStorage.getItem("dsalist")) || [];
        setDsaList(localList.length !== 0 ? localList : dsaTrackerList);
        setLoadedList(true);
    }, []);

    useEffect(() => {
        if (!loadedList) return;

        setOverallProgress(findOverallProgress(dsaList));
        // console.log(dsaList);
    }, [dsaList, loadedList]);

    const updateListFunction = (index, indexOfSub) => {
        if (!loadedList) return;

        setLoadedList(false);
        const newDsaList = [...dsaList];
        // reverse the complete status
        newDsaList[index].subsections[indexOfSub].completed = !newDsaList[index].subsections[indexOfSub].completed;
        // update the section progress
        newDsaList[index].progress = findSectionProgress(newDsaList[index].subsections);

        setDsaList(newDsaList);
        localStorage.setItem("dsalist", JSON.stringify(newDsaList));
        setLoadedList(true);
    }

    return (
        <div className="flex flex-col justify-center items-center mt-8 min-w-96">
            <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 font-bold text-3xl mb-4">
                DSA Tracker
            </h3>

            <div className="flex flex-col gap-10 w-[80%] md:w-[60%] mb-40 relative">
                {overallProgress === 100 && (
                    <h1 className="text-center text-4xl text-emerald-500">
                        Successfully completed! Hurray!
                    </h1>
                )}
                <p>Progress: {overallProgress}%</p>
                <div className={`-mt-5 rounded sticky top-0 bg-gradient-to-r from-purple-500 to-pink-500 
                                 transition-all h-2 w-[${overallProgress}%]`} />
                {loadedList && 
                    dsaList.map((list, i) => {
                        return (
                            <Section key={i} index={i} updateListFunction={updateListFunction} section={list}/>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default ProgressTracker;