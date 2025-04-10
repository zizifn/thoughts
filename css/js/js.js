document.getElementById('btn1')?.addEventListener('click', async () => {

    const module1 = await import('./js2.js');
    console.log(module1)

})