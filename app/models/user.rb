class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  belongs_to :role
  has_and_belongs_to_many :projects
  has_many :users, through: :projects
  has_many :todos
  validates :full_name, presence: true\
  , format: { with: /[\w]+([\s]+[\w]+){1}+/ }
  validates :role_id, presence: true
  scope :developer, -> { where(role_id: Role.developer) }

  def role_name
    role.try(:name)
  end

  def developer_wise
    users.where(role_id: Role.developer).uniq
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
      methods: [:role_name, :new_todos, :in_progress_todos, :done_todos]
    ))
  end
end
