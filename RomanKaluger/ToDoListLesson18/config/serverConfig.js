module.exports = {
    host: 'http://localhost:4000',//'https://masterkufa2.herokuapp.com',
    port: process.env.PORT || 4000,
    mongoURL: 'mongodb+srv://MasterKufa:1234qwerty@cluster0.lg8gy.azure.mongodb.net/<dbname>?retryWrites=true&w=majority',
    priorityImgsUrl: [
        'https://img.icons8.com/fluent/100/000000/low-priority.png',
        'https://img.icons8.com/fluent/100/000000/medium-priority.png',
        'https://img.icons8.com/fluent/100/000000/high-priority.png'
    ]
}
