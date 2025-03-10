
const nameToType = (str: string) => {
    const extArr: string [] = str.split('.')
    const ext: string = extArr[extArr.length-1];
    //console.log(ext)
    switch (ext) { 
        case 'txt': return {text: 'text-snippet'}
        case 'rar': return {text: 'archive'}
        case 'zip': return {text: 'archive'}
        case 'pdf': return {text: 'picture-as-pdf'}
        case 'doc': return {text: 'edit-document'}
        case 'docx': return {text: 'edit-document'}
        case 'png': return {text: 'image'}
        case 'jpg': return {text: 'image'}
        case 'jpeg': return {text: 'image'}
        case 'ico': return {text: 'image'}
        case 'sh': return {text: 'bash', community: true}
        default: return {text: "insert-drive-file"}
    }
}

export default {
    nameToType
}