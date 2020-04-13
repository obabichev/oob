import React, {useEffect, useRef, useState} from 'react';
import {fetchPostFiles} from '../../service/post';
import {uploadFile} from '../../service/files';
import classes from './PostFiles.module.css';
import {copyTextToClipboard} from '../../utils/copyTextToClipboard';
import {useRepeatableTimeout} from './hooks';
import classNames from 'classnames';
import {S3File} from '../../types';

export const PostFiles: React.FunctionComponent<{ postId: number; }> = ({postId}) => {
    const [files, setFiles] = useState<S3File[]>([]);
    const [copiedFileId, setCopiedFileId] = useState<number | null>(null);

    const refContainer = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (refContainer.current) {
            refContainer.current.scrollLeft = 0;
        }
    }, [files]);

    const timeout = useRepeatableTimeout();

    useEffect(() => {
        fetchPostFiles(postId)
            .then(files => setFiles(files))
            .catch(error => {
                console.error(error.message);
            })
    }, []);

    const onChangeHandler = (event: any) => {
        uploadFile(event.target.files[0], postId)
            .then(file => {
                setFiles([file, ...files])
            })
            .catch(error => {
                console.error(error.message);
            })
    };

    const onCopyFileUrl = (file: S3File) => () => {
        copyTextToClipboard(`![${file.id}](${file.url})`);
        setCopiedFileId(file.id);
        timeout(() => setCopiedFileId(null));
    };

    return <div className={classes.row}>
        <div className={classNames(classes.imageContainer, classes.bordered)}>
            <div className={classes.uploadButton}>
                <img src="/images/upload.svg"/>
                <input type="file" name="myfile" onChange={onChangeHandler}/>
            </div>
        </div>
        <div ref={refContainer}
             className={classNames(classes.row, classes.autoOverflow, classes.borderedImages)}>
            {files.map(file => (
                <div className={classNames(classes.imageWithHover, classes.imageContainer)}
                     key={file.id}
                     onClick={onCopyFileUrl(file)}>
                    <img src={file.url}/>
                    <div className={classes.imageHoverPadding}>
                        {copiedFileId === file.id ? 'Copied' : 'Click to copy URL'}
                    </div>
                </div>
            ))}
        </div>
    </div>
};
