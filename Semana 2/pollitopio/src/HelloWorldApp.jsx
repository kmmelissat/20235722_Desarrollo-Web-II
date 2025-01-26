const name = "Melissa"
const departamentos = ["San Salvador", "La Libertad", "Santa Ana"]
const personalData = {
    firstName: "Melissa",
    lastName: "Torres"
}
export const HelloWorldApp = () => {
    return (
        <>
            <div>
                <h1>Hello {name} !</h1>
                <h2>{personalData.lastName}</h2>

            </div>
            <div>
                <h2>{departamentos}</h2>
            </div>
        </>

    )

}