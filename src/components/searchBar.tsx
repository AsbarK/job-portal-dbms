export default function Search(){
    return (
        <div className="flex items-center border border-border rounded-lg shadow-md p-3 m-2">
            <svg
                className="w-6 h-6 mr-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path d="M21 21l-6-6m-4.582 1.428a8 8 0 111.166-1.166L21 21z"></path>
            </svg>
            <input
                className="sm:w-96 bg-transparent outline-none"
                type="text"
                placeholder="Search..."
            />
        </div>

    )
}