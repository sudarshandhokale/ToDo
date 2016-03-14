class AddRoleNameToRoleTable < ActiveRecord::Migration
  def change
    roles = [{ name: 'Admin' }, { name: 'Developer' }]
    Role.create(roles)
  end
end
