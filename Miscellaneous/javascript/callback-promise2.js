function test(err, ...values) {

    tes2(err, values)

}

function tes2(err, ...values) {
    console.log(values)
}


test(null, '1', '2');
