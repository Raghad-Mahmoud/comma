const datatable_learners_grid = new gridjs.Grid({
  columns: [
    'First Name',
    'Last Name',
    'Email',
    {
      name: 'Action',
      formatter: (_, row) =>
        gridjs.html(
          `<button type="button" class="edit-button-datatable edit-button-modal-opener text-nowrap" data-bs-target="#admin-accounts-edit-modal" data-bs-toggle="modal" data-email="${row.cells[2].data}">Edit</button>`
        )
    }
  ],
  fixedHeader: true,
  pagination: {
    limit: 5,
    server: {
      url: (prev, page, limit) => {
        let sign = ''
        if (prev == 'getlearnersdata') {
          sign = '?'
        } else {
          sign = '&'
        }
        return `${prev}${sign}limit=${limit}&offset=${page * limit}`
      }
    }
  },
  search: {
    server: {
      url: (prev, keyword) => `${prev}?search=${keyword}`
    }
  },
  sort: {
    multiColumn: false,
    server: {
      url: (prev, columns) => {
        if (!columns.length) {
          return prev
        }
        if (prev == 'getlearnersdata') {
          sign = '?'
        } else {
          sign = '&'
        }
        const col = columns[0]
        const dir = col.direction === 1 ? 'asc' : 'desc'
        let colName = ['First Name', 'Last Name', 'Email'][col.index]
        return `${prev}${sign}order=${colName}&dir=${dir}`
      }
    }
  },
  server: {
    url: 'getlearnersdata',
    method: 'POST',
    then: (data) =>
      data.learners.map((learner) => [learner.firstname, learner.lastname, learner.email]),
    total: (data) => data.count
  },
  className: {
    table: 'users-datatable-table',
    thead: 'users-datatable-thead',
    tbody: 'users-datatable-tbody',
    tr: 'users-datatable-tr',
    td: 'users-datatable-td'
  }
}).render(document.getElementById('datatable-users-table'))
