const TextBetweenLines = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex items-center">
        <div className="flex-grow border-t border-black"></div>
        <span className="mx-4">{children}</span>
        <div className="flex-grow border-t border-black"></div>
    </div>
}

export default TextBetweenLines
