const Credit = () => {
    return (
        <div className="w-full py-4 mt-6">
            <div className="max-w-lg mx-auto text-center">
                © {new Date().getFullYear()} Salvadorii · by{" "}
                <a
                    href="https://github.com/macreai/salvadorii"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-400 transition-colors"
                >
                Macreai
                </a>
            </div>
        </div>
    )
}

export default Credit;