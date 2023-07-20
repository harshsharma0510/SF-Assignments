const loadDataButton = document.getElementById('loadData') as HTMLButtonElement;
const userTable = document.getElementById('userTable') as HTMLTableElement;
const userTableBody = document.getElementById('userTableBody') as HTMLTableSectionElement;

loadDataButton.addEventListener('click', async () => {
  loadDataButton.textContent = 'Refresh Data';

  try {
    const users = await fetchUsers();
    displayUsers(users);
  } catch (err) {
    console.error('Error fetching users:', err);
  }
});

async function fetchUsers(): Promise<any[]> {
  const response = await fetch('http://localhost:3000/api/users');
  const users = await response.json();
  return users;
}

function displayUsers(users: any[]): void {
  userTableBody.innerHTML = '';

  for (const user of users) {
    const row = userTableBody.insertRow();

    for (const key in user) {
      if (user.hasOwnProperty(key)) {
        const cell = row.insertCell();
        cell.textContent = user[key];
      }
    }

    const actionsCell = row.insertCell();
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    editButton.textContent = 'Edit';
    deleteButton.textContent = 'Delete';

    editButton.addEventListener('click', () => {
      const saveButton = document.createElement('button');
      const cancelButton = document.createElement('button');

      saveButton.textContent = 'Save';
      cancelButton.textContent = 'Cancel';

      for (let i = 0; i < row.cells.length - 1; i++) {
        const cell = row.cells[i];
        const input = document.createElement('input');
        input.value = cell.textContent || '';
        cell.textContent = '';
        cell.appendChild(input);
      }

      actionsCell.innerHTML = '';
      actionsCell.appendChild(saveButton);
      actionsCell.appendChild(cancelButton);

      saveButton.addEventListener('click', async () => {
        const updatedUser = {
          firstName: (row.cells[0].firstChild as HTMLInputElement).value,
          middleName: (row.cells[1].firstChild as HTMLInputElement).value,
          lastName: (row.cells[2].firstChild as HTMLInputElement).value,
          email: (row.cells[3].firstChild as HTMLInputElement).value,
          phoneNumber: (row.cells[4].firstChild as HTMLInputElement).value,
          role: (row.cells[5].firstChild as HTMLInputElement).value,
          address: (row.cells[6].firstChild as HTMLInputElement).value,
        };

        try {
          await updateUser(updatedUser);
          loadDataButton.click();
        } catch (err) {
          console.error('Error updating user:', err);
        }
      });

      cancelButton.addEventListener('click', () => {
        loadDataButton.click();
      });
    });

    deleteButton.addEventListener('click', async () => {
      try {
        await deleteUser(user.email);
        loadDataButton.click();
      } catch (err) {
        console.error('Error deleting user:', err);
      }
    });

    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);
  }

  userTable.style.display = 'table';
}

async function updateUser(user: any): Promise<void> {
  const response = await fetch('http://localhost:3000/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error('Error updating user');
  }
}

async function deleteUser(email: string): Promise<void> {
  const response = await fetch(`http://localhost:3000/api/users/${email}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error deleting user');
}
}


(function init() {
userTable.style.display = 'none';
})();
   
