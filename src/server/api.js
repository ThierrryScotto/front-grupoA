import {api} from "./config"

export default {
  getStudents:() => {
    return api.get('students');
  },
  getStundet:(student) => {
    return api.get(`student/${ student }`)
  },
  registerStudent(student) {
    return api.post('register', { student })
  },
  editStudentRegister(student) {
    return api.put('edit', { student })
  }
}