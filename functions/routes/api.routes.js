const { Router } = require('express')
const router = Router()

const admin = require('firebase-admin')

admin.initializeApp({
    credential: admin.credential.cert('./credentials.json'),
    databaseURL: 'https://students-api-100.firebaseio.com'
})

const db = admin.firestore()

// Students API
router.get('/api/v1/students', async (req, res) => {
    try {
        const query = db.collection('students')
        const querySnapshot = await query.get()
        const docs = querySnapshot.docs
        
        const response = docs.map(doc => ({
            id: doc.id,
            codeStudent: doc.data().codeStudent,
            firstLastname: doc.data().firstLastname,
            secondLastname: doc.data().secondLastname,
            names: doc.data().names,
            cycle: doc.data().cycle,
            faculty: doc.data().faculty,
            specialty: doc.data().specialty,
            condition: doc.data().condition,
        }))
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.get('/api/v1/students/:id', async (req, res) => {
    try {
        const document = db.collection('students').doc(req.params.id)
        const student = await document.get()
        const response = student.data()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.post('/api/v1/students', async (req, res) => {
    try {
        await db.collection('students')
        .doc()
        .create({
            codeStudent: req.body.codeStudent,
            firstLastname: req.body.firstLastname,
            secondLastname: req.body.secondLastname,
            names: req.body.names,
            cycle: req.body.cycle,
            faculty: req.body.faculty,
            specialty: req.body.specialty,
            condition: req.body.condition,
        })
        return res.status(204).json() // No envía contenido
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})

router.delete('/api/v1/students/:id', async (req, res) => {
    try {
        const document = db.collection('students').doc(req.params.id)
        await document.delete()
        return res.status(200).json()
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.put('/api/v1/students/:id', async (req, res) => {
    try {
        const document = db.collection('students').doc(req.params.id)
        await document.update({
            firstLastname: req.body.firstLastname,
            secondLastname: req.body.secondLastname,
            names: req.body.names,
            cycle: req.body.cycle,
            faculty: req.body.faculty,
            specialty: req.body.specialty,
            condition: req.body.condition,
        })
        return res.status(200).json()
    } catch (error) {
        return res.status(500).json(error)
    }
})


// Courses API
router.get('/api/v1/courses', async (req, res) => {
    try {
        const query = db.collection('courses')
        const querySnapshot = await query.get()
        const docs = querySnapshot.docs
        
        const response = docs.map(doc => ({
            id: doc.id,
            codeCourse: doc.data().codeCourse,
            nameCourse: doc.data().nameCourse,
            credits: doc.data().credits,
            typeEvaluation: doc.data().typeEvaluation,
            sectionTotal: doc.data().sectionTotal,
            vacantTotal: doc.data().vacantTotal
        }))
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.get('/api/v1/courses/:id', async (req, res) => {
    try {
        const document = db.collection('courses').doc(req.params.id)
        const student = await document.get()
        const response = student.data()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.post('/api/v1/courses', async (req, res) => {
    try {
        await db.collection('courses')
        .doc()
        .create({
            codeCourse: req.body.codeCourse,
            nameCourse: req.body.nameCourse,
            credits: req.body.credits,
            typeEvaluation: req.body.typeEvaluation,
            sectionTotal: req.body.sectionTotal,
            vacantTotal: req.body.vacantTotal
        })
        return res.status(204).json() // No envía contenido
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})

router.delete('/api/v1/courses/:id', async (req, res) => {
    try {
        const document = db.collection('courses').doc(req.params.id)
        await document.delete()
        return res.status(200).json()
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.put('/api/v1/courses/:id', async (req, res) => {
    try {
        const document = db.collection('courses').doc(req.params.id)
        await document.update({
            nameCourse: req.body.nameCourse,
            credits: req.body.credits,
            typeEvaluation: req.body.typeEvaluation,
            sectionTotal: req.body.sectionTotal,
            vacantTotal: req.body.vacantTotal
        })
        return res.status(200).json()
    } catch (error) {
        return res.status(500).json(error)
    }
})


module.exports = router