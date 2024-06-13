/* eslint-disable no-undef */
import { useSelector } from "react-redux";
import TaskList from "./componants/TaskList";





// eslint-disable-next-line react/prop-types
export default function Home() {

    const user = useSelector((state) => state.user.user);


    return (
        <>
            <TaskList user={user} />

        </>

    )
}
