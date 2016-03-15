class Todo < ActiveRecord::Base
  belongs_to :project
  belongs_to :user
  validates_presence_of :summary, :user_id

  def developer
    user.full_name
  end

  def project_name
    project.name
  end

  def as_json(options = {})
    super((options || {}).merge(
      methods: [:developer, :project_name]
    ))
  end
end
