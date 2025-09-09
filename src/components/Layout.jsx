export const Layout = ({ children, bg = "bg-transparent" }) => {
    return (
        <div className={`w-full text-shadow-lg/30 h-auto ${bg} bg-cover bg-center `}>
            {children}
        </div>
    );
};