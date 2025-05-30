import React from "react";
import PageHeader from "../../Components/PageHeader";

function Home() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    return (
        <>
            <PageHeader
                divider
                title={`Hello ${user?.name || "User"}`}
                subtitle="View and control your finances here!"
            />
        </>
    );
}

export default Home;
