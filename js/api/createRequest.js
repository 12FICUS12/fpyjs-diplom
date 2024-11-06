/**
 * Основная функция для совершения запросов по Yandex API.
 * */
const createRequest = (options = {}) => {
    let urlParams = '?';
    if (options.data){
        for (let param in options.data){
            urlParams += `${param}=${options.data[param]}&`
        }
        urlParams = urlParams.substring(0, urlParams.length - 1)
    }
    const head = new Headers(options.headers);
    (async () => {
        let response = await fetch(options.url + urlParams, {
            method: options.method,
            headers: head,
            body: options.body
        });
        let result ;
        if (response.status <204){
            try {
                result = await response.json();
            } catch (error){
                console.log(error);
                result = null;
            }
            return options.callback(result)
        }
        else if (response.status ==204){
            return options.callback(null)
        } else {
            console.log(response);
            alert('Просим прощения! Техническая ошибка, повторите позже')
        }
    })

};
