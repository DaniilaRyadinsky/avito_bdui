package github.detrig.composetutorial.presentation.cart

import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.platform.LocalContext
import github.detrig.composetutorial.core.Screen
import github.detrig.composetutorial.di.ProvideViewModel
import github.detrig.uikit.components.screen.ScreenRenderer
import github.detrig.uikit.core.ActionDispatcher
import github.detrig.composetutorial.ui.theme.common.UiStateHandler
import github.detrig.uikit.components.screen.ScreenState

object CartScreen : Screen {
    private const val SCREEN_ID = "21d7850d-1775-4610-9ccd-5896515aa381"

    @Composable
    override fun Show() {
        val viewModel =
            (LocalContext.current.applicationContext as ProvideViewModel)
                .viewModel(CartViewModel::class.java)

        LaunchedEffect(Unit) {
            viewModel.loadScreenById(SCREEN_ID)
        }

        val screenUiState by viewModel.screenUiState.collectAsState()

        UiStateHandler.ScreenStateHandler(
            uiState = screenUiState,
            fetchScreenJson = { screenId -> viewModel.loadScreenJson(screenId) },
            onRetry = { } //viewModel.loadScreenFromJsonString(json) }
        ) { screenComponent ->
            val dispatcher = remember(screenComponent) {
                ActionDispatcher(state = ScreenState(screenComponent)) { id ->
                    viewModel.navigateToScreenById(id)
                }.apply { registerDefaultActions() }
            }
            ScreenRenderer.Render(screenComponent, ScreenState(screenComponent), dispatcher)
        }
    }


    val json = """
        {
  "type": "screen",
  "id": "checkout_screen",
  "name": "CheckoutScreen",
  "background": "#FFFFFF",
  "topBar": [
    {
      "type": "row",
      "modifier": {
        "fillMaxWidth": true,
        "padding": { "start": 16, "end": 16, "top": 12, "bottom": 12 }
      },
      "verticalAlignment": "centerVertically",
      "children": [
        {
          "type": "icon",
          "icon": "close",
          "modifier": { "size": { "width": "24", "height": "24" } }
        },
        {
          "type": "spacer",
          "modifier": { "weight": 1 }
        },
        {
          "type": "text",
          "text": "Оформление доставки",
          "style": { "fontSize": 18, "fontWeight": "bold" }
        }
      ]
    }
  ],
  "content": [
    {
      "type": "column",
      "children": [
        {
          "type": "text",
          "text": "Способ получения",
          "style": { "fontSize": 16, "fontWeight": "bold" },
          "modifier": { "padding": { "start": 16, "top": 8, "bottom": 8 } }
        },
        {
          "type": "card",
          "modifier": {
            "fillMaxWidth": true,
            "padding": { "start": 16, "end": 16, "bottom": 12 }
          },
          "shape": { "cornerRadius": 12 },
          "background": "#F8F8F8",
          "children": [
            {
              "type": "row",
              "children": [
                {
                  "type": "text",
                  "text": "Амито",
                  "style": { "fontSize": 14, "fontWeight": "medium" }
                },
                {
                  "type": "spacer",
                  "modifier": { "weight": 1 }
                },
                {
                  "type": "text",
                  "text": "592₽, 1-4 дня",
                  "style": { "fontSize": 14, "color": "#E53935" }
                }
              ]
            }
          ]
        },
        {
          "type": "card",
          "modifier": {
            "fillMaxWidth": true,
            "padding": { "start": 16, "end": 16, "bottom": 12 }
          },
          "shape": { "cornerRadius": 12 },
          "children": [
            {
              "type": "column",
              "children": [
                {
                  "type": "text",
                  "text": "Pear Store",
                  "style": { "fontSize": 16, "fontWeight": "bold" }
                },
                {
                  "type": "text",
                  "text": "Зарядка MagSafe Charger 15W 1 метр",
                  "style": { "fontSize": 14, "color": "#555555" }
                },
                {
                  "type": "text",
                  "text": "157₽, 1-4 дня",
                  "style": { "fontSize": 14, "color": "#E53935" }
                }
              ]
            }
          ]
        },
        {
          "type": "card",
          "modifier": {
            "fillMaxWidth": true,
            "padding": { "start": 16, "end": 16, "bottom": 12 }
          },
          "shape": { "cornerRadius": 12 },
          "children": [
            {
              "type": "column",
              "children": [
                {
                  "type": "text",
                  "text": "TECHNO ZONE",
                  "style": { "fontSize": 16, "fontWeight": "bold" }
                },
                {
                  "type": "text",
                  "text": "iPhone 16 Pro, 256 ГБ",
                  "style": { "fontSize": 14, "color": "#555555" }
                },
                {
                  "type": "text",
                  "text": "1059₽, 1-4 дня",
                  "style": { "fontSize": 14, "color": "#E53935" }
                }
              ]
            }
          ]
        },
        {
          "type": "text",
          "text": "Получатель",
          "style": { "fontSize": 16, "fontWeight": "bold" },
          "modifier": { "padding": { "start": 16, "top": 12, "bottom": 8 } }
        },
        {
          "type": "text",
          "text": "Князева Екатерина\n+7 800 555-35-35 · catherineu@gmail.com",
          "style": { "fontSize": 14, "color": "#444444" },
          "modifier": { "padding": { "start": 16, "bottom": 12 } }
        },
        {
          "type": "button",
          "text": "Изменить получателя",
          "style": {
            "background": "#F0F0F0",
            "textColor": "#000000",
            "shape": { "cornerRadius": 8 }
          },
          "modifier": { "padding": { "start": 16, "end": 16, "bottom": 12 } }
        },
        {
          "type": "text",
          "text": "Способы оплаты",
          "style": { "fontSize": 16, "fontWeight": "bold" },
          "modifier": { "padding": { "start": 16, "top": 12, "bottom": 8 } }
        },
        {
          "type": "column",
          "children": [
            {
              "type": "row",
              "children": [
                {
                  "type": "checkbox",
                  "isChecked": true,
                  "colors": {
                    "checkedColor": "#000000",
                    "uncheckedColor": "#808080"
                  }
                },
                {
                  "type": "text",
                  "text": "Кошелёк (СБП)",
                  "style": { "fontSize": 14 }
                }
              ]
            },
            {
              "type": "row",
              "children": [
                {
                  "type": "checkbox",
                  "isChecked": false,
                  "colors": {
                    "checkedColor": "#000000",
                    "uncheckedColor": "#808080"
                  }
                },
                {
                  "type": "text",
                  "text": "T-Банк (СБП)",
                  "style": { "fontSize": 14 }
                }
              ]
            },
            {
              "type": "row",
              "children": [
                {
                  "type": "checkbox",
                  "isChecked": false,
                  "colors": {
                    "checkedColor": "#000000",
                    "uncheckedColor": "#808080"
                  }
                },
                {
                  "type": "text",
                  "text": "СБП через банк",
                  "style": { "fontSize": 14 }
                }
              ]
            },
            {
              "type": "row",
              "children": [
                {
                  "type": "checkbox",
                  "isChecked": false,
                  "colors": {
                    "checkedColor": "#000000",
                    "uncheckedColor": "#808080"
                  }
                },
                {
                  "type": "text",
                  "text": "СБП через банк",
                  "style": { "fontSize": 14 }
                }
              ]
            },
            {
              "type": "row",
              "children": [
                {
                  "type": "checkbox",
                  "isChecked": false,
                  "colors": {
                    "checkedColor": "#000000",
                    "uncheckedColor": "#808080"
                  }
                },
                {
                  "type": "text",
                  "text": "СБП через банк",
                  "style": { "fontSize": 14 }
                }
              ]
            },
            {
              "type": "row",
              "children": [
                {
                  "type": "checkbox",
                  "isChecked": false,
                  "colors": {
                    "checkedColor": "#000000",
                    "uncheckedColor": "#808080"
                  }
                },
                {
                  "type": "text",
                  "text": "СБП через банк",
                  "style": { "fontSize": 14 }
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "bottomBar": [
    {
      "type": "row",
      "modifier": {
        "fillMaxWidth": true,
        "padding": { "start": 16, "end": 16, "top": 8, "bottom": 8 }
      },
      "children": [
        {
          "type": "text",
          "text": "Итого с доставкой: 110 687 ₽",
          "style": { "fontSize": 16, "fontWeight": "bold" }
        },
        {
          "type": "spacer",
          "modifier": { "weight": 1 }
        },
        {
          "type": "button",
          "text": "Перейти к оплате",
          "style": {
            "background": "#000000",
            "textColor": "#FFFFFF",
            "shape": { "cornerRadius": 12 }
          },
          "modifier": { "height": "48" }
        }
      ]
    }
  ]
}
        """
}
