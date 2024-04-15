const deleteExperience = async (id, token) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/experiences/${id}`,
      {
        method: 'DELETE',
        body: JSON.stringify(),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.ok) {
      console.log('Experience deleted successfully');
    } else {
      console.error('Something went wrong');
    }
  } catch (error) {
    console.error('Error deleting experience:');
  }
};

export default deleteExperience;
