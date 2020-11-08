import { testFun, greetings } from "./demo-modules"
import styles from './app.css'

function main() {
    // test webpack for js file
    testFun();
    // alert("test webpack for js")
    document.write(greetings("Affirmative", "Dave"));

    // test tet
    // test husky 1
    testCss();
}

function testCss() {
    //     let element = `
    //     <div class="testImg">
    //     </div>
    //   <div class="element">
    //     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur laudantium recusandae itaque libero velit minus ex reiciendis veniam. Eligendi modi sint delectus beatae nemo provident ratione maiores, voluptatibus a tempore!</p>
    //   </div>
    // `
    let element = `
<div class="testImg">
</div>
`
    console.log("css to string ", styles.toString())
    document.write(element);
}

main()
