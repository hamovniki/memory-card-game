export const MENU_SETTINGS_TEMPLATE = /*html*/ `
    <div class='menu-settings'>
        <h3 class='menu-settings-title'>НАСТРОЙКИ</h3>
        
        <fieldset>
            <legend>Выберите сложность:</legend>

            <div>
                 <input type="radio" id="settings-easy" name="difficulty" value="easy" />
                 <label for="settings-easy">Easy</label>
            </div>

            <div>
                 <input type="radio" id="settings-medium" name="difficulty" value="medium" />
                 <label for="settings-medium">Medium</label>
            </div>

            <div>
                 <input type="radio" id="settings-hard" name="difficulty" value="hard" />
                 <label for="settings-hard">Hard</label>
            </div>
        </fieldset>


          <div class="sound-settings">
               <label>Громкость:</label>
               <input type="range" id="volume-slider" min="0" max="1" step="0.01" value="0.5">
          </div>

        <button class='back-to-menu-button'>ВЕРНУТЬСЯ В МЕНЮ</button>
    </div>
    ` as const;
