export interface AppState {
    
}

export interface SettingState {
    autoStart: boolean;
    dockShow: boolean;
    autoUpdate: boolean;
}

export interface MouseDataItem {
    text?: string;
    action: (val: any) => void;
    group?: MouseDataItem[];
    sperator?: boolean;
    disabled?: boolean;
}