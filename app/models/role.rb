class Role < ActiveRecord::Base
  has_many :users
  scope :developer, -> { find_by(name: DEVELOPER).id }
end
