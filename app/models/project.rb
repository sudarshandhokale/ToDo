class Project < ActiveRecord::Base
  has_and_belongs_to_many :users
  has_many :todos
  validates_presence_of :name

  def developers
    users.where(role_id: Role.developer)
  end

  def admins
    users.where(role_id: Role.admin)
  end

  def new_todos
    todos.where(new: true)
  end

  def in_progress_todos
    todos.where(in_progress: true)
  end

  def done_todos
    todos.where(done: true)
  end

  def as_json(options = {})
    super((options || {}).merge(
      methods: [:developers, :todos, :new_todos, :in_progress_todos, :done_todos]
    ))
  end
end
