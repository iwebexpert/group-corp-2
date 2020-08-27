const settings = new Settings();

try{
    settings.init({speed:11, winLength:5});
    console.log(settings);

} catch (error){
    //В мессадж можно настроить вывод ошибки.
    console.log(error.message);
}

