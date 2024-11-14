const createRequest = async (options = {}) => {
    const params = new URLSearchParams(options.data);
    const url = new URL(options.url);
    url.search = params.toString();
     
    try {
        const response = await fetch(url.href, {
            method: options.method,
            headers: options.headers,
            credentials: 'include'
        });

        let result;
        if (response.status < 204) {
            try {
                result = await response.json();
            } catch (error) {
                console.log(error);
                result = null;
            }
            return options.callback ? options.callback(result) : null;
        } else if (response.status === 204) {
            return options.callback ? options.callback(null) : null;
        } else {
            console.log(response);
            alert('Просим прощения! Техническая ошибка, повторите позже');
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        alert('Произошла ошибка при выполнении запроса.');
    }
};