import { remult } from 'remult'
import fs from 'fs'
import path from 'path'
import { AdmissionApplication, ApplicationStatus } from '../../shared/entities/AdmissionApplication'

export async function enrollStudent(admissionId: string) {
  const repo = remult.repo(AdmissionApplication)
  const admission = await repo.findId(admissionId)
  if (!admission) throw 'Admission not found'

  const studentId = `STU${Math.floor(10000 + Math.random() * 90000)}`
  const tempPath = path.join('uploads/temp', admission.tempFolder)
  const studentPath = path.join('uploads/students', studentId)

  fs.mkdirSync(studentPath, { recursive: true })

  for (const file of fs.readdirSync(tempPath)) {
    fs.renameSync(path.join(tempPath, file), path.join(studentPath, file))
  }

  fs.rmdirSync(tempPath)

  admission.status = ApplicationStatus.Enrolled
  admission.studentId = studentId
  admission.documentFolderPath = `uploads/students/${studentId}`
  await repo.save(admission)
}
