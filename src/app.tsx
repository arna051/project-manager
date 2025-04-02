import { useSearchParams } from "next/navigation";
import { Assistant } from "./components/Assistant";
import { Background } from "./components/Background";
import { Header } from "./components/Header";

export function App(props: { children: React.ReactNode }) {
    const searchParams = useSearchParams(); // Used to read query params
    const type = searchParams?.get('type');


    const isTouchAssist = type === 'assist';
    return isTouchAssist ?
        <Assistant />
        :
        <>
            <Background />
            {props.children}
            <Header />
        </>
}