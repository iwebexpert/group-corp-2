declare module 'react-radial-menu' {
    export interface IMenuItem {
        href: string;
        image: string;
    }

    interface IRadialMenuProps {
        items: IMenuItem[];
        center: Omit<IMenuItem, 'href'>;
        itemsSize: number;
        distance: number;
    }

    const Menu: React.FC<IRadialMenuProps>;
    export default Menu;
}
declare module 'material-auto-rotating-carousel' {
    import {CSSProperties} from "react";
    export const Slide: React.FC<{
        mediaBackgroundStyle: CSSProperties;
        style: CSSProperties;
        title: string;
        subtitle: string;
        media: React.ReactNode;
    }>;
    export const AutoRotatingCarousel: React.FC<{
        open: boolean;
        onClose: () => void;
        autoplay: boolean;
    }>;
}
declare module 'react-mic-record' {
    import {IRecordedAudio} from "../components/messenger/InputMessageArea/InputMessageArea";

    interface IRecorder {
        record: boolean;
        className?: string;
        onStop: (x: IRecordedAudio) => void;
        strokeColor?: string;
        backgroundColor?: string;
    }

    const ReactMicRecord: React.FC<IRecorder>;
    export default ReactMicRecord;
}

