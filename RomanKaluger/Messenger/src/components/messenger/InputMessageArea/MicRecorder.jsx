import ReactMicRecord from 'react-mic-record';
import React, {useState} from "react";
import MicOffIcon from '@material-ui/icons/MicOff';
import MicIcon from '@material-ui/icons/Mic';
import CloseIcon from '@material-ui/icons/Close';
import {wsStatuses} from "../../../configs/statuses";
import Fab from "@material-ui/core/Fab";

export const MicRecorder = ({setRecordedAudio, setIsRecord, isRecord, isDisabled}) => {
    const startRecording = () => setIsRecord(true);
    const stopRecording = () => setIsRecord(false);
    const onStop = (recordedBlob) => setRecordedAudio(recordedBlob);
    return (
        <>
            {isRecord
                ? <>
                    <Fab
                        onClick={stopRecording}
                        size={'large'} disabled={isDisabled}
                        color="primary">
                        <MicIcon/>
                    </Fab>
                    <ReactMicRecord
                        record={isRecord}
                        className="sound-wave"
                        onStop={onStop}
                        strokeColor="orange"
                        backgroundColor="#343A40"/>
                </>
                :
                <Fab
                    onClick={startRecording}
                    size={'large'} disabled={isDisabled}
                    color="primary">
                    <MicOffIcon/>
                </Fab>
            }
        </>
    );
};
