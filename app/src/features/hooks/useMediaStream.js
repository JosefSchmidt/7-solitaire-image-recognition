// Libs
import React, {useEffect, useState} from 'react';

const UseMediaStream = (requestedMedia) => {

    const [mediaStream, setMediaStream] = useState(null);

    useEffect(() => {
        async function enableStream() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia(requestedMedia);
                setMediaStream(stream);
            } catch(err) {
                // Removed for brevity
            }
        }

        if (!mediaStream) {
            enableStream();
        } else {
            return function cleanup() {
                mediaStream.getTracks().forEach(track => {
                    track.stop();
                });
            }
        }


    }, [mediaStream, requestedMedia])

    return mediaStream;
};

export default UseMediaStream;