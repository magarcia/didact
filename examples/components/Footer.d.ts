import { Filters } from "./constants";
interface FooterProperties {
    count: number;
    nowShowing: Filters.ALL_TODOS | Filters.ACTIVE_TODOS | Filters.COMPLETED_TODOS;
    completedCount: number;
    onClearCompleted: Function;
    onFilterSelected: Function;
}
export declare function Footer(props: FooterProperties): any;
export {};
