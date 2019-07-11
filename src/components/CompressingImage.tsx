import React, { EventHandler } from 'react';

export interface FileInfo {
    name: string,
    type: string,
    size: string,
    base64: string | ArrayBuffer | null,
    file: File
}

export default class FileBase64 extends React.Component<any> {

    constructor(props: any) {
        super(props);
        this.state = {
            files: [],
        };
    }

    handleChange(e: React.FormEvent) {

        // get the files
        let files = (e.target as HTMLInputElement).files;
        
        // Process each file
        var allFiles: Array<FileInfo> = [];
        if(files){
            for (var i = 0; i < files.length; i++) {

                let file = files[i];
    
                // Make new FileReader
                let reader = new FileReader();
    
                // Convert the file to base64 text
                reader.readAsDataURL(file);
    
                // on reader load somthing...
                reader.onload = () => {
    
    
    
                    // Make a fileInfo Object
                    let fileInfo: FileInfo = {
                        name: file.name,
                        type: file.type,
                        size: Math.round(file.size / 1000) + ' kB',
                        base64: reader.result,
                        file: file,
                    };
    
                    // Push it to the state
                    allFiles.push(fileInfo);
    
                    // If all files have been proceed
                    if (files && allFiles.length == files.length) {
                        // Apply Callback function
                        if (this.props.multiple) this.props.onDone(allFiles);
                        else this.props.onDone(allFiles[0]);
                    }
    
                } // reader.onload
    
            } // for
        }
    }

    render() {
        return (
            <input
                type="file"
                onChange={this.handleChange.bind(this)} />
        );
    }
}