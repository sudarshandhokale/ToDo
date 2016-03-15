class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string :summary
      t.boolean :new, default: true
      t.boolean :in_progress
      t.boolean :done
      t.references :project, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
