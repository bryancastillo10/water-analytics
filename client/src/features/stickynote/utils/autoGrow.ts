export const autoGrow = (textAreaRef: React.MutableRefObject<HTMLTextAreaElement | null>) => {
    const { current } = textAreaRef;
    if (current) {
        current.style.height = "auto";
        current.style.height = current.scrollHeight + "px";
    }
}