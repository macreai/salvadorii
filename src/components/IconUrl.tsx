import { useStore } from "../model/zustand";
import LiquidGlassContainer from "./common/LiquidGlassContainer";

const IconUrl: React.FC = () => {

    const { url } = useStore();

    return (
        <div className="flex flex-col gap-4 mb-4 max-w-lg mx-auto">
            <div className="flex items-center gap-3 w-full">
            <LiquidGlassContainer className="flex items-center justify-center w-20 h-20 rounded-4xl">
                <img
                src="/logo.png"
                alt="Logo"
                className="w-20 h-20 object-cover scale-110"
                />
            </LiquidGlassContainer>

            <LiquidGlassContainer className="flex-1 h-20 px-3 text-white rounded-4xl flex items-center">
                <span className="truncate whitespace-nowrap">
                {url}
                </span>
            </LiquidGlassContainer>
            </div>
        </div>
    )
}

export default IconUrl;