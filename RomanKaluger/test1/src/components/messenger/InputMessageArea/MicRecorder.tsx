import ReactMicRecord from 'react-mic-record';
import React from "react";
import MicOffIcon from '@material-ui/icons/MicOff';
import MicIcon from '@material-ui/icons/Mic';
import Fab from "@material-ui/core/Fab";
import {IRecordedAudio} from "./InputMessageArea";

type propTypes = {
    setRecordedAudio: React.Dispatch<React.SetStateAction<IRecordedAudio | null>>,
    setIsRecord: React.Dispatch<React.SetStateAction<boolean>>,
    isRecord: boolean,
    isDisabled: boolean
};
export const MicRecorder: React.FC<propTypes> = ({setRecordedAudio, setIsRecord, isRecord, isDisabled}) => {
    const startRecording = (): void => setIsRecord(true);
    const stopRecording = (): void => setIsRecord(false);
    const onStop = (recordedBlob: IRecordedAudio): void => setRecordedAudio(recordedBlob);
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
