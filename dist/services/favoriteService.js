import Student from '../models/Student.js';
export const addModuleToFavorites = async (studentId, moduleId) => {
    // We zoeken de student op ID en voegen de module_id toe aan de array 'favorieten'
    const updatedStudent = await Student.findByIdAndUpdate(studentId, {
        $addToSet: { favorieten: { module_id: moduleId } }
    }, { new: true } // Geeft het document terug zoals het er NA de update uitziet
    );
    if (!updatedStudent) {
        throw new Error('Student niet gevonden');
    }
    return updatedStudent;
};
export const removeModuleFromFavorites = async (studentId, moduleId) => {
    // Met $pull verwijderen we een specifiek item uit de array
    const updatedStudent = await Student.findByIdAndUpdate(studentId, {
        $pull: { favorieten: { module_id: moduleId } }
    }, { new: true });
    if (!updatedStudent) {
        throw new Error('Student niet gevonden');
    }
    return updatedStudent;
};
export const getStudentWithFavorites = async (studentId) => {
    const student = await Student.findById(studentId);
    if (!student)
        throw new Error('Student niet gevonden');
    return student.favorieten;
};
//# sourceMappingURL=favoriteService.js.map